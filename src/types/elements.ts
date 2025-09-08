import { BlockElementType } from './block';
import { PageModelType } from './page';

export type EditorElementShapes = BlockElementType | PageModelType;

export type EditorElementTypes = EditorElementShapes['type'];
