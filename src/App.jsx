import { useForm } from "react-hook-form";

function App() {

  const { register, handleSubmit, formState:{errors}, watch, setValue, reset } = useForm()

  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert("Form completado :D");
    reset()
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          {...register("name", {
            required: {
              value: true,
              message: "Name is required"
            },
            minLength: {
              value: 2,
              message: "Name debe tener minimo 2 letras"
            },
            maxLength: {
              value: 20,
              message: "Name debe tener maximo 20 letras"
            }
          })}
        />
        {
          errors.name && <span>{errors.name.message}</span>
        }

        <label htmlFor="email">Correo: </label>
        <input 
          type="email" 
          {...register("email")}
        />

        <label htmlFor="password">Password: </label>
        <input 
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required"
            }
          })}
        />
        {
          errors.password && <span>{errors.password.message}</span>
        }

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input 
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password is required"
            },
            validate: value => value === watch("password") || "La contraseña no coincide"
          })}
        />
        {
          errors.confirmPassword && <span>{errors.confirmPassword.message}</span>
        }

        <label htmlFor="date">Fecha de nacimiento: </label>
        <input 
          type="date"
          {...register("date", {
            required: {
              value: true,
              message: "Fechaa de nacimiento es requerida"
            },
            validate: (value) => {
              const fechaDeNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad = fechaActual.getFullYear() - fechaDeNacimiento.getFullYear();

              return edad >= 18 || "Debe ser mayor de edad."
            }
          })}
        />
        {
          errors.date && <span>{errors.date.message}</span>
        }

        <label htmlFor="pais">Pais: </label>
        <select {...register("pais")}>
          <option value="mx">Mexico</option>
          <option value="cl">Colombia</option>
          <option value="ar">Argentina</option>
        </select>
        {
          watch("pais") === "ar" && (
            <>
              <input 
                type="text" 
                placeholder="Provincia"
                {...register("provincia", {
                  required: {
                    value: true,
                    message: "Provincia is required"
                  }
                })}
              />
              {
                errors.provincia && <span>{errors.provincia.message}</span>
              }
            </>
          )
        }

        <label htmlFor="foto">Foto de Perfil: </label>
        <input 
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setValue("fotoUsuario", e.target.files[0].name)
          }}
        />

        <label htmlFor="termino">Termino y Condiciones: </label>
        <input 
          type="checkbox"
          {...register("termino")}
        />

        <button>Enviar</button>

        <pre>
          {
            JSON.stringify(watch(), null, 2)
          }
        </pre>
      </form>
    </div>
  )
}

export default App
