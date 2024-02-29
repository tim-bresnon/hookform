import { useState } from 'react'
import './App.css'
import { SubmitHandler, useFieldArray, useForm  } from 'react-hook-form'
import {string, z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// type FormData = {
//   name: string,
//   number: number, 
//   gender: string,
//   isAdult: boolean,
//   age: number
// }

const SkillSchema = z.object({
  name: z.string().min(1,{message:'name s req'}),
  rank: z.number(),
});

const schema = z.object({
  name: z.string().min(3),
  number: z.string().min(10),
  // gender: z.enum(['male', 'female', 'other']),
  gender: z.string().min(1,{message:'gender is required'}),
  isAdult: z.string().min(1, {
    message:'adult or not'
  }),
  age: z.number(),
  skills: z.array(SkillSchema)

})
type FormData = z.infer<typeof schema>

function App() {


  const { register, handleSubmit, formState: { errors, isSubmitting  },control, watch } = useForm<FormData>({
    defaultValues: {
      // name: 'name',
      // number: 25638947,
      gender: 'male',
      // isAdult: false,
      // age: 0
      skills: [
        {
          name:'html' , rank : 5
        }
      ]
    },
    resolver: zodResolver(schema)
  })

  const {fields,append,remove} = useFieldArray({
    name: 'skills',
    control
  })

  const showConditionalInput = watch('isAdult','yes');

  console.log(showConditionalInput)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((res,rej)=>setTimeout(res, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register('name')} />
        {
          errors.name && (
            <p>{errors.name.message}</p>
          )
        }
      </label>
      <br />
      <label>
        Number:
        <input type="text" {...register('number')} />
        {
          errors.number && (
            <p>{errors.number.message}</p>
          )
        }
      </label>

      <br />

      <label>
        Gender:
        <select {...register('gender', {
          required:'gender is required'
        })} >
          <option value="">choose</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {
          errors.gender && (
            <p>{errors.gender.message}</p>
          )
        }
      </label>

      <br />



      <div className="switch-field">
        <label>
          <input
            type="radio"
            id="personyes"
            value="yes"
            {...register('isAdult')}
            checked
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            id="personno"
            {...register('isAdult')}
            value="no"
            
          />
          No
        </label>
        {
          errors.isAdult && (
            <p>{errors.isAdult.message}</p>
          )
        }
      </div>

      <br />

      {
        showConditionalInput && (

      <label>
        age:
        <input type="number" {...register('age')}  />
      </label>
        )

      }

      
      <div>
        <label > skills </label>
        {
          fields.map((f, i) => {
            return (
              <>
              <label>
              skill:
              <input type="text" {...register(`skills.${i}.name` as const)}  />
                </label>

                <label>
              rank:
              <input type="text" {...register(`skills.${i}.rank` as const)}  />
            </label>
                {
                  i > 0 && (
                    <button type='button' onClick={()=>remove(i)}>remove</button>
                  )
              }
              </>
            )
          })
        }
        <button type='button' onClick={()=>append({name:'',rank:5})}>add new</button>
      </div>



    

      <button disabled={isSubmitting} type="submit">
        {
          isSubmitting ? 'loading': 'submit'
        }
      </button>
    </form>
  )
}

export default App


{/* <form onSubmit={handleSubmit(onSubmit)}>
<label>
  Name:
  <input type="text" {...register('name', {
    required: 'name  is req',
    minLength: { value: 3, message: 'min length 3' },
    pattern:  /^[A-Za-z]+$/i,
  })} />
  {
    errors.name && (
      <p>{errors.name.message}</p>
    )
  }
</label>

<br />

<label>
  Number:
  <input type="text" {...register('number')}  />
</label>

<br />

<label>
  Gender:
  <select {...register('gender', {
    required:'gender is required'
  })} >
    <option value="">choose</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
  {
    errors.gender && (
      <p>{errors.gender.message}</p>
    )
  }
</label>

<br />



<div className="switch-field">
  <label>
    <input
      type="radio"
      id="personyes"
      value="yes"
      {...register('isAdult')}
    />
    Yes
  </label>

  <label>
    <input
      type="radio"
      id="personno"
      {...register('isAdult')}
      value="no"
      checked
    />
    No
  </label>
</div>

<br />

{
  showConditionalInput && (

<label>
  age:
  <input type="number" {...register('age')}  />
</label>
  )

}



<button disabled={isSubmitting} type="submit">
  {
    isSubmitting ? 'loading': 'submit'
  }
</button>
</form> */}