"use client";
import { useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { IRegisterArgs } from "@/features/auth/type";
import RegisterSchema from "../auth/regisschema";
import { RegisterService } from "@/features/auth/api/post.auth";
import { useSnackbar } from "notistack";
import Link from "next/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: IRegisterArgs = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = ({ name, email, password }: IRegisterArgs) => {
    RegisterService({ name, email, password })
      .then(() => {
        enqueueSnackbar("Register Success", {
          variant: "success",
          autoHideDuration: 1500,
        });
      })
      .catch((err: any) => {
        if (err.response?.data.code === 1155) {
          enqueueSnackbar("Email sudah terdaftar", {
            variant: "error",
            autoHideDuration: 1500,
          });
        } else {
          enqueueSnackbar("Register failed", {
            variant: "error",
            autoHideDuration: 1500,
          });
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <div className="w-full max-w-sm space-y-4">
        <Link href="/">
          <Button
            variant="outline"
            className="w-full cursor-pointer ber-400 text-black"
          >
            Back to Home
          </Button>
        </Link>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<IRegisterArgs>) => {
            const { values, errors, touched, handleChange } = props;

            return (
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-2xl">
                      REGISTER
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex flex-col gap-1">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <div className="text-red-500 text-xs ml-1 min-h-4">
                        {touched.name && errors.name && `*${errors.name}`}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <div className="text-red-500 text-xs ml-1 min-h-4">
                        {touched.email && errors.email && `*${errors.email}`}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        <span
                          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </span>
                      </div>
                      <div className="text-red-500 text-xs ml-1 min-h-4">
                        {touched.password &&
                          errors.password &&
                          `*${errors.password}`}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full cursor-pointer">
                      REGISTER
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
