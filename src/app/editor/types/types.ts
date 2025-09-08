export type ActionsType<ActionsPayloadType> = {
	[K in keyof ActionsPayloadType]: {
		type: K;
	} & ActionsPayloadType[K];
}[keyof ActionsPayloadType];
