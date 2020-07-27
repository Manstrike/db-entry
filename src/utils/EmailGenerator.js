export class EmailGenerator {
    static generate(firstName, lastName, email) {
        const emailDomain = email.split('@')[1];

        return `${firstName}.${lastName}@${emailDomain}`;
    }
}
