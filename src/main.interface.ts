export interface GetFilePathsInDirectoryInterface {
    fullPath: string;
    relativePath: string;
}

export interface GetRelativePathOptionsInterface {
    relativeRoot: string;
    removeLeadingSlash: boolean;
    lastIndexOfRelativeRoot: boolean;
}
