type File = { name: string; size: number; type: "file" }
type FileSystem = {
  name: string
  parent: FileSystem
  type: "folder"
  subDirectories: { [key: string]: FileSystem | File }
}

export const findSmallFileSystems = (input: string) => {
  const fileSystem = parseInput(input)
  return getSmallerFolders(fileSystem)
}

export const findSmallestFileToDelete = (input: string): number => {
  const totalSpace = 70000000
  const spaceNeeded = 30000000
  const folderSizes = getFolderSizes(parseInput(input))
  const usedSpace = folderSizes["/"]
  const remaining = totalSpace - usedSpace
  const target = spaceNeeded - remaining

  const candidatesToDelete = Object.values(folderSizes).filter(
    (folderSize) => folderSize >= target,
  )
  const [toDelete] = candidatesToDelete.sort((a, b) => a - b)
  return toDelete
}

const createRoot = (): FileSystem => {
  const root: Omit<FileSystem, "parent"> = {
    type: "folder",
    name: "/",
    subDirectories: {},
  }
  return { ...root, parent: root as FileSystem }
}

const parseInput = (input: string): FileSystem => {
  const commands = input.split("$")

  const fileSystem = createRoot()
  commands.reduce<FileSystem>((prev, c) => {
    const [command, ...output] = c.trim().split("\n")

    if (command.startsWith("ls")) {
      output.forEach((line) => {
        const [description, name] = line.split(" ")
        if (description === "dir") {
          prev.subDirectories[name] = {
            name,
            parent: prev,
            type: "folder",
            subDirectories: {},
          }
        } else {
          prev.subDirectories[name] = {
            name,
            size: Number(description),
            type: "file",
          }
        }
      })
    }

    if (command.startsWith("cd")) {
      const [_cd, to] = command.split(" ")
      if (to === "..") {
        return prev.parent
      }
      if (to === "/") {
        return fileSystem
      }
      const dir = prev.subDirectories[to]
      if (dir.type === "file") {
        throw Error("tried to navigate to a file")
      }
      return dir
    }
    return prev
  }, fileSystem)
  return fileSystem
}

const getSmallerFolders = (fileSystem: FileSystem): number => {
  const folderSizes = getFolderSizes(fileSystem)
  return Object.values(folderSizes)
    .filter((size) => size <= 100000)
    .reduce((prev, sum) => prev + sum, 0)
}

const visit = (
  preaction: (node: FileSystem | File) => void,
  postAction: (node: FileSystem | File) => void,
  fileSystem: FileSystem | File,
) => {
  preaction(fileSystem)
  if (fileSystem.type === "folder")
    Object.values(fileSystem.subDirectories).forEach((file) =>
      visit(preaction, postAction, file),
    )
  postAction(fileSystem)
}

const toString = (fileSystem: FileSystem): string => {
  const folderSizes = getFolderSizes(fileSystem)
  const path: string[] = []
  let level = 0
  let accumulator = ""
  const preAction = (node: FileSystem | File) => {
    path.push(node.name)
    const name = path.join("/")
    const desc =
      node.type === "file"
        ? `${node.name} ${node.size}`
        : `${node.name} (dir) ${folderSizes[name]}`
    accumulator = accumulator + " ".repeat(level) + desc + "\n"
    level++
  }
  const postAction = () => {
    level--
    path.pop()
  }
  visit(preAction, postAction, fileSystem)
  return accumulator
}

const getFolderSizes = (fileSystem: FileSystem) => {
  const accumulator: { [dirName: string]: number } = {}
  const path: string[] = []
  const preAction = (node: FileSystem | File) => {
    if (node.type === "file") return
    path.push(node.name)
  }
  const postAction = (node: FileSystem | File) => {
    if (node.type === "file") return
    const name = path.join("/")
    const size = Object.values(node.subDirectories).reduce((size, child) => {
      if (child.type === "file") {
        return size + child.size
      }
      return size + accumulator[name + "/" + child.name]
    }, 0)
    accumulator[name] = size
    path.pop()
  }
  visit(preAction, postAction, fileSystem)
  return accumulator
}
