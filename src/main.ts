import { GetFilePathsOptions, GetFilePathsOutput } from './main.interface';
import {
    getFileName,
    getFilePathsGenerator,
    getRelativePath,
} from './lib/utilities';
import { GET_RELATIVE_PATH_DEFAULTS } from './lib/defaults';

/**
 * Take a directory path and return an array of objects with full & relative file paths for every file in that directory.
 * Recursive through child directories and except for directories or files listed in the excludes array.
 *
 * @param directoryPath
 * @param options
 */
export const getFilePaths = async (
    directoryPath: string,
    options?: GetFilePathsOptions,
): Promise<GetFilePathsOutput[]> => {
    const ourOptions: GetFilePathsOptions = {
        ...GET_RELATIVE_PATH_DEFAULTS,
        ...options,
    };
    const paths: GetFilePathsOutput[] = [];

    for await (const fullPath of getFilePathsGenerator(
        directoryPath,
        ourOptions.excludes,
    )) {
        const relativePath = options?.relativeRoot
            ? getRelativePath(fullPath, ourOptions)
            : fullPath;
        const fileName = getFileName(fullPath);
        const fileObject: GetFilePathsOutput = {
            fullPath,
            relativePath: ourOptions.removeLeadingSlash
                ? relativePath.substring(1, relativePath.length)
                : relativePath,
            fileName: ourOptions.removeLeadingSlash
                ? fileName.substring(1, fileName.length)
                : fileName,
        };

        paths.push(fileObject);
    }

    return paths;
};
// todo remove test log before publishing release
getFilePaths('./', {
    relativeRoot: 'projects',
}).then((res) => console.log('our result: ', res));
