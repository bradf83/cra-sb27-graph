import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
/**
 * A basic form using react-hook-form
 * Simple required, number and pattern validations
 * Watch a field and
 */
const BasicHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  // Watch the first name field and do something
  const watchedFirstName = watch("firstName");
  useEffect(() => {
    if (watchedFirstName) {
      console.log("First Name Changed", watchedFirstName);
    } else {
      console.log("First Name Cleared");
    }
  }, [watchedFirstName]);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-semibold">Form Example</h1>
      <form className="pt-5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="border-2 border-gray-500 rounded p-1 mr-2"
            placeholder="First Name"
            {...register("firstName", { required: true, maxLength: 20 })}
          />
          {errors.firstName && (
            <span className="text-red-500">First name is required!</span>
          )}
        </div>

        <div>
          <input
            className="border-2 border-gray-500 rounded p-1 mr-2"
            placeholder="Last Name"
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
          />
          {errors.lastName && (
            <span className="text-red-500">Last name is required!"</span>
          )}
        </div>
        <div>
          <input
            className="border-2 border-gray-500 rounded p-1 mr-2"
            placeholder="Age"
            type="number"
            {...register("age", { min: 18, max: 99, required: true })}
          />
          {errors.age && (
            <span className="text-red-500">Age is required (18-99)!</span>
          )}
        </div>
        <input
          className="py-2 px-4 border-2 bg-blue-300 border-blue-500 rounded"
          type="submit"
        />
      </form>
    </div>
  );
};

export default BasicHookForm;
