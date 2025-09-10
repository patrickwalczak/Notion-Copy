import { BlockElementsOperations, BlockElementType } from './block';
import { PageModelType, PageOperationsType } from './page';

export type EditorElementShapes = BlockElementType | PageModelType;

export type EditorElementsOperations = BlockElementsOperations | PageOperationsType;

export type EditorElementTypes = EditorElementShapes['type'];
