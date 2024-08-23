export default interface LeadExternalRepository {
    sendMsg({ message, phone }: { message: string; phone: string }): Promise<any>;
}
