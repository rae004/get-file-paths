export interface GetFilePathsOutput {
    fullPath: string;
    relativePath: string;
}

export interface GetFilePathsOptions {
    relativeRoot?: string;
    includeRelativeRoot: boolean;
    excludes?: string[];
    removeLeadingSlash?: boolean;
    lastIndexOfRelativeRoot?: boolean;
}
