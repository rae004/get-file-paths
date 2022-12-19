import { promises as fsp } from 'fs';
import path from 'path';
import { GetFilePathsOptions } from '../main.interface';

/**
 * Returns a file path from a relative root within a full path
 *
 * e.g. a fullPath of /usr/src/app/src/forms/layouts/<relativeRoot>/public/index.html
 * *** would be returned as public/index.html with opts.removeLeadingSlash = true (Default)
 * *** or /public/index.html with opts.removeLeadingSlash = false
 *
 * If lastIndexOfRelativeRoot = true we use lastIndexOf method to locate the index of relativeRoot
 *
 * e.g. if our full path is /usr/<relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
 * *** with lastIndexOfRelativeRoot = true (Default), then it would return a result of <relativeRoot>/forms/layouts/test-form-layout/public/index.html
 * *** with lastIndexOfRelativeRoot = false we would get <relativeRoot>/app/<relativeRoot>/forms/layouts/test-form-layout/public/index.html
 *
 * @param fullPath
 * @param options
 */
export const getRelativePath = (
    fullPath: string,
    options: GetFilePathsOptions,
) => {
    const relativeRoot = options.relativeRoot ?? '';
    const relativeRootLength = options.relativeRoot
        ? options.relativeRoot.length
        : 0;

    const includeRelativeRoot = options?.includeRelativeRoot
        ? -1
        : relativeRootLength;

    return options.lastIndexOfRelativeRoot
        ? fullPath.substring(
              fullPath.lastIndexOf(relativeRoot) + includeRelativeRoot,
              fullPath.length,
          )
        : fullPath.substring(
              fullPath.indexOf(relativeRoot) + includeRelativeRoot,
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
export const getFilePathsGenerator = async function* (
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

export const getFileName = (path: string) => {
    return path.substring(path.lastIndexOf('/'), path.length);
};
