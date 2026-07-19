

function validate(schema){
    return((req, res, next) => {
        const result = schema.safeParse(req.body);

        if(result.success) {
            req.validatedData = result.data;
            next();
        }
        else{
            console.error(result.error);
            return(
                    res.status(400).json({
                    "success": false,
                    "message": "validation failed",
                    "error": result.error.issues 
                })
            )
        }

    })
}

export {validate};