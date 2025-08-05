"use client";
import { useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";
import { ILoginArgs } from "@/features/auth/type";
import LoginSchema from "./loginschema";
import { LoginService } from "@/features/auth/api/get.auth";

export default function LoginForm() {
  const { onAuthSuccess } = useAuthStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const initialValues: ILoginArgs & { role: string } = {
    email: "",
    password: "",
    role: "",
  };

  const handleSubmit = ({ email, password, role }: typeof initialValues) => {
    LoginService({ email, password, role })
      .then((data) => {
        onAuthSuccess({ email: data.email, role }); 
        enqueueSnackbar("Login success", { variant: "success" });
        router.push("/");
      })
      .catch(() =>
        enqueueSnackbar("Email atau password salah", { variant: "error" })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">LOGIN</CardTitle>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<typeof initialValues>) => {
            const { values, errors, touched, handleChange } = props;

            return (
              <Form>
                <CardContent className="flex flex-col gap-4">
                  <Input
                    id="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-500">*{errors.email}</p>
                  )}

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <span
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </span>
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-sm text-red-500">*{errors.password}</p>
                  )}

                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="">Pilih Role</option>
                    <option value="attendee">Attendee</option>
                    <option value="organizer">Organizer</option>
                  </select>
                  {touched.role && errors.role && (
                    <p className="text-sm text-red-500">*{errors.role}</p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" variant="secondary" className="w-full">
                    LOGIN
                  </Button>
                  <Button variant="link" onClick={() => router.push("/")}>
                    ← Back to Home
                  </Button>
                </CardFooter>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
