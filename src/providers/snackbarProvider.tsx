"use client";

import { SnackbarProvider as SnackBarProviderNotistack } from "notistack";

export default function SnackbarProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SnackBarProviderNotistack>{children}</SnackBarProviderNotistack>
    </>
  );
}
