import { GetFilePathsInDirectoryInterface } from './main.interface';
import { getFilePathsGenerator, getRelativePath } from './utilities';

/**
 * Take a directory path and return an array of objects with full & relative file paths for every file in that directory.
 * Recursive through child directories and except for directories or files listed in the excludes array.
 *
 * @param directoryPath
 * @param relativeRoot
 */
export const getFilePathsInDirectory = async (
    directoryPath: string,
    relativeRoot: string,
): Promise<GetFilePathsInDirectoryInterface[]> => {
    const excludes = ['node_modules/', 'dist/', 'build/', '.git/'];
    const paths = [];

    for await (const fullPath of getFilePathsGenerator(
        directoryPath,
        excludes,
    )) {
        const relativePath = getRelativePath(fullPath, relativeRoot);
        paths.push({
            fullPath,
            relativePath,
        });
    }

    return paths;
};

getFilePathsInDirectory('./', 'rae004').then((res) =>
    console.log('our result: ', res),
);
