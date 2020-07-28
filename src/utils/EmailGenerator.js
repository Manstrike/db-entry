export class EmailGenerator {
    static generate({ firstName, secondName, email }) {
        const emailDomain = email.split('@')[1];

        return `${firstName}.${secondName}@${emailDomain}`
            .toLowerCase();
    }
}
