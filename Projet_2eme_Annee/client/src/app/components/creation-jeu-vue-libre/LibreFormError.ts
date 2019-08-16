export class LibreFormError {
    public errorName: boolean;
    public nameExist: boolean;
    public errorCheck: boolean;
    public errorQuantity: boolean;

    public constructor() {
        this.errorName = false;
        this.errorCheck = false;
        this.errorQuantity = false;
    }
}
