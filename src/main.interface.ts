export interface GetFilePathsInDirectoryInterface {
    fullPath: string;
    relativePath: string;
}

export interface GetRelativePathOptionsInterface {
    removeLeadingSlash: boolean;
    lastIndexOfRelativeRoot: boolean;
}
