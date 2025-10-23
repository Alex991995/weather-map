import { ZodError, ZodIssue } from 'zod';

export class CustomZodError extends ZodError {
	statusCode: number;
	context?: string;
	constructor(statusCode: number, issues: ZodIssue[], context?: string) {
		super(issues);
		this.statusCode = statusCode;
		this.context = context;
	}
}





