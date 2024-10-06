export const AuthFooter = () => {
  const date = new Date();
  return (
    <div className="mx-auto mt-12 max-w-sm">
      <div className="text-center">
        <p className="mb-4 text-xs text-coolGrey-4 dark:text-coolGrey-6 ">
          By continuing with your account, you agree to our Terms of Service and Privacy Policy. ©{" "}
          {date.getFullYear()} Copyright
        </p>
      </div>
    </div>
  );
};
