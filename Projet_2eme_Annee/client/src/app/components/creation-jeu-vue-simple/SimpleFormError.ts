export class SimpleFormError {
    public error7Diff: boolean;
    public errorName: boolean;
    public nameExist: boolean;
    public originalImageEmpty: boolean;
    public modifiedImageEmpty: boolean;
    public submitCompleted: boolean;

    public constructor() {
        this.error7Diff = false;
        this.errorName = false;
        this.originalImageEmpty = false;
        this.modifiedImageEmpty = false;
        this.submitCompleted = false;
    }
}
