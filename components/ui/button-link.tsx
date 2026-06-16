import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { VariantProps } from "class-variance-authority";

type ButtonLinkProps = React.ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

// Botão que renderiza um <Link> de Next.js — substitui Button asChild + Link
export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Button
      render={<Link href={href} {...props} />}
      nativeButton={false}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}

type ButtonAnchorProps = React.ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

// Botão que renderiza um <a> externo — substitui Button asChild + <a>
export function ButtonAnchor({ variant, size, className, children, ...props }: ButtonAnchorProps) {
  return (
    <Button
      render={<a {...props} />}
      nativeButton={false}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
