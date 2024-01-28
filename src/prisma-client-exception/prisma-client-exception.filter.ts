import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

// Use the @Catch decorator to specify that this filter should handle Prisma.PrismaClientKnownRequestError exceptions
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    // Override the catch method to handle the Prisma error and customize the response
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        // Log the exception message to the console
        console.error(exception.message)

        // Extract the HTTP context from the host
        const ctx = host.switchToHttp()

        // Get the response object from the context
        const response = ctx.getResponse<Response>()

        // Remove newline characters from the exception message for cleaner logging
        const message = exception.message.replace(/\n/g, '')

        // Handle specific Prisma error codes with custom responses
        switch (exception.code) {
            // P2002: Unique constraint violation
            case 'P2002': {
                const status = HttpStatus.CONFLICT // Set HTTP status code to 409 (Conflict)
                response.status(status).json({
                    statusCode: status,
                    message: message,
                })
                break
            }
            // P2003: Foreign key constraint violation
            case 'P2003': {
                const status = HttpStatus.CONFLICT // Set HTTP status code to 409 (Conflict)
                response.status(status).json({
                    statusCode: status,
                    message: message,
                })
                break
            }
            // P2025: Record not found
            case 'P2025': {
                const status = HttpStatus.NOT_FOUND // Set HTTP status code to 404 (Not Found)
                response.status(status).json({
                    statusCode: status,
                    message: message,
                })
                break
            }
            // If the error code is not recognized, fallback to the default error handling
            default:
                // Call the parent class's catch method to handle other exceptions (e.g., internal server errors)
                super.catch(exception, host)
                break
        }
    }
}