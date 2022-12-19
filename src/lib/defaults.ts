import { GetFilePathsOptions } from '@/src/main.interface';

export const GET_RELATIVE_PATH_DEFAULTS: GetFilePathsOptions = {
    relativeRoot: __dirname,
    removeLeadingSlash: true,
    lastIndexOfRelativeRoot: true,
    excludes: ['node_modules/', 'dist/', 'build/', '.git/'],
    includeRelativeRoot: false,
};
