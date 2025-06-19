import React from 'react';
import EditableDiv from '../elements/editableDiv/EditableDiv';

const ElementBox = ({ element }) => {
	return (
		<div className={`${styles.elementBox}`}>
			<EditableDiv id={element.id} properties={element.properties} />
		</div>
	);
};

export default ElementBox;
