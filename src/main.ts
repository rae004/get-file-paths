import { GetFilePathsOptions, GetFilePathsOutput } from './main.interface';
import { getFilePathsGenerator, getRelativePath } from './lib/utilities';
import { GET_RELATIVE_PATH_DEFAULTS } from './lib/defaults';

/**
 * Take a directory path and return an array of objects with full & relative file paths for every file in that directory.
 * Recursive through child directories and except for directories or files listed in the excludes array.
 *
 * @param directoryPath
 * @param options
 */
export const getFilePathsInDirectory = async (
    directoryPath: string,
    options?: GetFilePathsOptions,
): Promise<GetFilePathsOutput[]> => {
    const ourOptions = { ...GET_RELATIVE_PATH_DEFAULTS, ...options };
    const paths = [];

    for await (const fullPath of getFilePathsGenerator(
        directoryPath,
        ourOptions.excludes,
    )) {
        const relativePath = getRelativePath(fullPath, { ...ourOptions });

        paths.push({
            fullPath,
            relativePath,
        });
    }

    return paths;
};

getFilePathsInDirectory('./', {
    relativeRoot: 'rae004',
    includeRelativeRoot: true,
    removeLeadingSlash: true,
    lastIndexOfRelativeRoot: true,
}).then((res) => console.log('our result: ', res));
