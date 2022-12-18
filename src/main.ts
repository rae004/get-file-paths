import { promises as fsp } from 'fs';
import path from 'path';
import {
    GetFilePathsInDirectoryInterface,
    GetRelativePathOptionsInterface,
} from './main.interface';

/**
 * Returns a file path from a relative root within a full path
 *
 * e.g. a fullPath of /usr/src/app/src/forms/layouts/<relativeRoot>/public/index.html
 * *** would be returned as <relativeRoot>/public/index.html with opts.removeLeadingSlash = true (Default)
 * *** or /<relativeRoot>/public/index.html with opts.removeLeadingSlash = false
 *
 * If lastIndexOfRelativeRoot = true we use lastIndexOf method to locate the index of relativeRoot
 *
 * e.g. if our full path is /usr/<relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
 * *** with lastIndexOfRelativeRoot = true (Default), then it would return a result of <relativeRoot>/forms/layouts/test-form-layout/public/index.html
 * *** with lastIndexOfRelativeRoot = false we would get <relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
 *
 * @param fullPath
 * @param relativeRoot
 * @param opts
 */
const getRelativePath = (
    fullPath: string,
    relativeRoot: string,
    opts: GetRelativePathOptionsInterface = {
        removeLeadingSlash: true,
        lastIndexOfRelativeRoot: true,
    },
) => {
    const stringStartPadding = opts.removeLeadingSlash ? 1 : 0;
    return opts.lastIndexOfRelativeRoot
        ? fullPath.substring(
              fullPath.lastIndexOf(relativeRoot) +
                  relativeRoot.length +
                  stringStartPadding,
              fullPath.length,
          )
        : fullPath.substring(
              fullPath.indexOf(relativeRoot) +
                  relativeRoot.length +
                  stringStartPadding,
              fullPath.length,
          );
};

/**
 * Generator function to loop through directories and return full file paths.
 * Recursively calls itself if another directory is encountered.
 *
 * @param dir directory path to search.
 * @param excludes string array of directory or file names to exclude.
 */
const getFilePathsGenerator = async function* (
    dir: string,
    excludes: string[] = [],
): AsyncIterableIterator<string> {
    for (const dirent of await fsp.readdir(dir, { withFileTypes: true })) {
        const res = path.resolve(dir, dirent.name);

        const isExcluded = excludes.map((exclude) => res.includes(exclude));

        if (!isExcluded.includes(true)) {
            if (dirent.isDirectory()) {
                yield* getFilePathsGenerator(res, excludes);
            } else {
                yield res;
            }
        }
    }
};

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
