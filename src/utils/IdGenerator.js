import shortId from 'shortid';

export class IdGenerator {
    generate() {
        return shortId.generate();
    }
}
