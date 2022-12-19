export interface GetFilePathsOutput {
    fullPath: string;
    relativePath: string;
    fileName: string;
}

export interface GetFilePathsOptions {
    /**
     * The value to use when searching a fullPath for the relativeRoot.
     *
     * e.g. A fullPath of /usr/src/app/public/index.html passing a relative of 'app'
     * *** would return a result of public/index.html
     *
     * DEFAULTS = __dirname
     * */
    relativeRoot?: string;
    /**
     * Include the relative root in relativePath result
     *
     * e.g. If true a fullPath of /usr/src/app/src/forms/layouts/<relativeRoot>/public/index.html
     * *** would return a result of <relativeRoot>/public/index.html.
     * *** If false a fullPath of /usr/src/app/src/forms/layouts/<relativeRoot>/public/index.html
     * *** would return result of public/index.html.
     *
     * DEFAULTS = false
     * */
    includeRelativeRoot?: boolean;
    /**
     * A string array of directory or file names to exclude from the results
     *
     * DEFAULTS = ['node_modules/', 'dist/', 'build/', '.git/']
     * */
    excludes?: string[];
    /**
     * Remove the leading forward slash from the beginning of relativePath & fileName in result
     *
     * DEFAULTS = true
     * */
    removeLeadingSlash?: boolean;

    /**
     * If lastIndexOfRelativeRoot = true we use lastIndexOf method to locate the index of relativeRoot
     *
     * e.g. if our full path is /usr/<relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
     * *** with lastIndexOfRelativeRoot = true, then it would return a result of <relativeRoot>/forms/layouts/test-form-layout/public/index.html
     * *** with lastIndexOfRelativeRoot = false we would get <relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
     *
     * DEFAULTS = true
     * */
    lastIndexOfRelativeRoot?: boolean;
}
