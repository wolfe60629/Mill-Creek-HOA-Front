export class Doc {
    name?: String;
    fileName: String;
    description?: String;
    value: String;
    category: String;
}

export class DocumentContainer {
    docmap: Map<String, Doc>;
}
