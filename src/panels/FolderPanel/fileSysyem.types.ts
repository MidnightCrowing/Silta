export interface BaseNode {
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface FileNode extends BaseNode {
  type: 'file'
  extension: string // 文件扩展名
}

export interface DirectoryNode extends BaseNode {
  type: 'directory'
  children: FileSystemNode[]
}

export type FileSystemNode = FileNode | DirectoryNode
