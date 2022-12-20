import { ValidatorInterface } from './../@shared/ValidatorInterface';
import { User } from '../entities/User';
import * as Yup from "yup";


 class UserYupValidator implements ValidatorInterface<User>{
   async validate(entity: User) {
        try {          
           Yup
            .object()
            .shape({
                name: Yup.string().required("Nome é obrigatório"),
                username: Yup.string().required("Username é obrigatório"),
                email: Yup.string().email("Formato de e-mail inválido").required("E-mail é obrigatório")
              
            })
            .validateSync(
                {
                    name: entity.name,
                    username: entity.username,
                    email: entity.email
                },
                {
                    abortEarly: false,
                }
            )

        } catch (err) {
            const errors : any = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error: any) => {
                  errors[error.path] = error.message;
                });
                return { errors };
            }
              
        }
    }
    
}
export default new UserYupValidator();