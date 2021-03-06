import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { WorkspaceProject } from '@angular-devkit/core/src/workspace';
/** Reads file given path and returns TypeScript source file. */
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
/** Import and add module to root app module. */
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject): void;
/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export declare function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void;
/** Gets the app index.html file */
export declare function getIndexHtmlPath(host: Tree, project: WorkspaceProject): string;
/** Get the root stylesheet file. */
export declare function getStylesPath(host: Tree, project: WorkspaceProject): string;
/** Wraps the internal find module from options with undefined path handling  */
export declare function findModuleFromOptions(host: Tree, options: any): import("@angular-devkit/core").Path;
