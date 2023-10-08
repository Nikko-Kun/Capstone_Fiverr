import React, { useEffect, useRef, useState } from "react";
import { CreateItem } from "./button/CreateItem";
import InputSearch from "./input/InputSearch";
import { TrashIcon } from "./icons/trash";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { useSelector } from "react-redux";
import { GetAuthResponse, QueryDividePage } from "../../react-app-env";
import { useForm } from "react-hook-form";
import { getListUser } from "../../redux/quanLyAuth/thunkAction";
import { quanLyAuthService } from "../../services/quanLyAuth.service";
import clsx from "clsx";
import InputForm from "../core/InputForm";
import { SaveIcon } from "./icons/save";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Pagination from "./pagination/Pagination";

type Props = {};

const ManageUser = (props: Props) => {
  const dispatch = useAppDispatch();
  const { listUser, totalRow } = useSelector(
    (state: RootState) => state.quanLyAuth
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(20);
  const [term, setTerm] = useState(0);
  const [viewDetail, setViewDetail] = useState<GetAuthResponse>();
  const [showForm, setShowForm] = useState(false);
  const [showTabDetail, setShowTabDetail] = useState(false);
  const [keyword, setKeyword] = useState("");

  let inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const payload: QueryDividePage = {
      pageIndex,
      pageSize,
      keyword,
    };
    dispatch(getListUser(payload));
  }, [dispatch, pageIndex, pageSize, keyword]);

  const { register, handleSubmit, setValue, reset } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchInforAccount = async () => {
      try {
        const res = await viewDetail;
        setValue("id", res?.id || "");
        setValue("name", res?.name || "");
        setValue("phone", res?.phone || "");
        setValue("birthday", res?.birthday || "");
        setValue("gender", res?.gender || "");
        setValue("email", res?.email || "");
        setValue("password", res?.password);
        setValue("role", "ADMIN");
        setValue("skill", []);
        setValue("certification", []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInforAccount();
  }, [viewDetail, setValue]);

  const onSubmit = async (user: any) => {
    try {
      const res = await quanLyAuthService.postUser(user);
      if (res.data.statusCode !== 400) {
        alert("Sign up success");
        const listUser = await quanLyAuthService.layDanhSachUser();
        let getUser = listUser.data.content.filter(
          (value: GetAuthResponse) => value.email === res.data.content.email
        );
        let value = getUser[0];
        value.role = "ADMIN";
        const updateStt = await quanLyAuthService.updateUser(value.id, value);
        if (totalRow) {
          setPageIndex(Math.floor(totalRow / pageSize) + 1);
          setTerm(Math.floor(totalRow / pageSize) * pageSize);
        }
        dispatch(getListUser({ pageIndex, pageSize, keyword }));
        setViewDetail(updateStt.data.content);
        setShowTabDetail(!showTabDetail);
        setShowForm(!showForm);
      }
    } catch (error) {
      alert("Account is existed");
    }
  };
  const handlerSubmit = (isNext: boolean = true) => {
    if (totalRow) {
      const totalIndex = Math.floor(totalRow / pageSize);
      const conditionNext = pageIndex <= totalIndex && pageIndex >= 1;
      const conditionPre = pageIndex > 1 && pageIndex <= totalIndex + 1;
      if (isNext && conditionNext) {
        setPageIndex(pageIndex + 1);
        setTerm(term + pageSize);
      }
      if (isNext === false && conditionPre) {
        setPageIndex(pageIndex - 1);
        setTerm(term - pageSize);
      }
    }
  };
  const handlerSetPageIndex = (index: number) => {
    setPageIndex(index);
    setTerm(pageSize * (index - 1));
  };

  const renderListUser = () => {
    return listUser?.map((item: GetAuthResponse, index: number) => {
      return (
        <tr className="border-b dark:border-neutral-500" key={index}>
          <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
          <td className="whitespace-nowrap px-6 py-4">{item.birthday}</td>
          <td className="whitespace-nowrap px-6 py-4">
            {item.gender ? "Female" : "Male"}
          </td>
          <td className="whitespace-nowrap px-6 py-4">{item.role}</td>
          <td className="whitespace-nowrap px-6 py-4 flex gap-2">
            <button
              className={clsx({
                hidden: item.role.toLocaleLowerCase() === "admin",
              })}
              onClick={async () => {
                if (item.id && item.role.toLowerCase() !== "admin") {
                  await quanLyAuthService.deleteUser(item.id);
                  dispatch(getListUser({ pageIndex, pageSize, keyword }));
                }
              }}
            >
              <TrashIcon
                className="w-[25px] h-[25px]"
                fill="rgb(120, 12, 12)"
              />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="manage-service">
      <div className="content relative">
        <div className="group-btn">
          <CreateItem
            className="btn-create"
            nameBtn="Create Admin"
            onClick={() => {
              setShowTabDetail(!showTabDetail);
              setShowForm(!showForm);
              reset();
            }}
          />
          <div className="flex">
            <InputSearch
              name="search"
              placeholder="Search.."
              type="text"
              ref={inputRef}
            />
            <button
              className="btn-create"
              onClick={() => {
                let newKeyword = inputRef.current?.value;
                if (newKeyword) {
                  setKeyword(newKeyword);
                } else {
                  setKeyword("");
                }
              }}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
        <div className="table-manage w-[100%] overflow-hidden">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Birthday
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderListUser()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          handlerSetPageIndex={handlerSetPageIndex}
          handlerSubmit={handlerSubmit}
          pageSize={pageSize}
          totalRow={totalRow}
          pageIndex={pageIndex}
          term={term}
        />
        <div
          className={clsx(
            "tab-detail absolute top-0 left-[10%] w-[80%] bg-color-black p-10 rounded-lg",
            {
              hidden: !showTabDetail,
            }
          )}
        >
          <div
            className={clsx("edit-detail", {
              hidden: !showForm,
            })}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputForm
                {...register("name")}
                label="User Name"
                type="text"
                disabled={false}
              />
              <Checkbox
                className="my-3 text-sm font-semibold text-neutral-500 flex"
                {...register("gender")}
                disabled={false}
                defaultChecked={false}
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
                disabled={false}
              />
              <InputForm
                {...register("password", {
                  required: "Please enter content",
                })}
                label="Password"
                type="password"
              />
              <div className="mt-6 flex gap-4">
                <CreateItem className="btn-create">
                  {" "}
                  <SaveIcon />
                </CreateItem>
                <span
                  className="border text-font-20 btn-create"
                  onClick={() => {
                    setShowTabDetail(false);
                    setShowForm(false);
                  }}
                >
                  <span className="text-color-red opacity-[0.7] font-semibold">
                    X
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
