export class Success<T> {
	public status: boolean;
	public statusCode: number;
	public message: string;
	public data: T;

	constructor(message: string, data: T, statusCode = 200) {
		this.status = true;
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
	}
}

export class HttpError extends Error {
	public status: boolean;
	public statusCode: number;
	public errors: any;

	constructor(message: string, errors: any = null, statusCode = 500) {
		super(message);
		this.status = false;
		this.statusCode = statusCode;
		this.errors = errors;
		this.name = this.constructor.name;
	}
}

export const isHttpError = (error: any): error is HttpError => {
	return (
		error instanceof Error &&
		'status' in error &&
		'statusCode' in error &&
		'errors' in error
	);
};
