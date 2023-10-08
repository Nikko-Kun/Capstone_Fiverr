import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/config-store";
import { useForm } from "react-hook-form";
import InputForm from "./inputForm/InputForm";
import { Checkbox, message } from "antd";
import { updateUser } from "../redux/quanLyAuth/thunkAction";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type Props = {};

const UserInfor = (props: Props) => {
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      await dispatch(updateUser(data));
      message.success("Update account success");
    } catch (error) {
      console.log(error);
      message.error("Update account fail");
    }
  };

  useEffect(() => {
    const fetchInforAccount = async () => {
      try {
        const res = await auth?.user;
        setValue("id", res?.id || "");
        setValue("name", res?.name || "");
        setValue("phone", res?.phone || "");
        setValue("birthday", res?.birthday || "");
        setValue("gender", res?.gender);
        setValue("email", res?.email || "");
        setValue("password", "");
        setValue("role", res?.role || "");
        setValue("skill", []);
        setValue("certification", []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInforAccount();
  }, [auth?.user, setValue]);

  return (
    <div>
      <div className="w-[100%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            {...register("name", {
              required: "Please enter content",
              maxLength: {
                value: 20,
                message: "Username has maximum 20 characters",
              },
            })}
            label="User Name"
            type="text"
            disabled={false}
            error={errors.name?.message}
          />
          <Checkbox
            {...register("gender")}
            disabled={false}
            defaultChecked={auth?.user.gender}
            onChange={(e: CheckboxChangeEvent) =>
              setValue("gender", e.target.checked)
            }
          >
            Gender
          </Checkbox>
          <InputForm
            {...register("phone", {
              required: "Please enter content",
              maxLength: {
                value: 10,
                message: "Phone number have 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone number have 10 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone must be number",
              },
            })}
            label="Phone Number"
            type="text"
            disabled={false}
            error={errors?.phone?.message}
          />
          <InputForm
            {...register("email", {
              required: "Please enter content",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter correct format email",
              },
            })}
            label="Email"
            type="email"
            disabled={true}
            error={errors?.email?.message}
          />

          <InputForm
            {...register("birthday", {
              required: "Please enter content",
            })}
            label="Birthday"
            type="text"
            disabled={false}
            error={errors?.birthday?.message}
          />
          <InputForm
            {...register("role", {
              required: "Please enter content",
            })}
            label="Role"
            type="text"
            disabled={true}
            error={errors?.role?.message}
          />
          {/* 
                    <InputForm
            {...register("password", {
              required: "Please enter content",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                message: "Please enter correct format password",
              },
            })}
            label="Password"
            type="password"
            disabled={false}
            error={errors?.password?.message}
          />
          
          <InputForm
            {...register("certification", {
              required: "Please enter content",
            })}
            label="Certification"
            type="text"
            disabled={false}
            error={errors?.certification?.message}
          />
          <InputForm
            {...register("skill", {
              required: "Please enter content",
            })}
            label="Skill"
            type="text"
            disabled={false}
            error={errors?.skill?.message}
          /> */}
          <div className="m-6 text-center">
            <button
              className="btn-search-carousel rounded-lg text-color-white font-semibold"
              type="submit"
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfor;
