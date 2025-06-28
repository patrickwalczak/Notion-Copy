import React from 'react';
import EditableDiv from '../elements/editableDiv/EditableDiv';
import styles from './styles.module.scss';

const ElementBox = ({ element }) => {
	return (
		<div className={`${styles.elementBox}`}>
			<EditableDiv id={element.id} properties={element.properties} />
		</div>
	);
};

export default ElementBox;
