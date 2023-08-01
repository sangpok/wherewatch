// import React, { ComponentProps } from "react";

// import { MotionProps } from "framer-motion";

// type StackProps = {
//   row?: boolean;
//   gap?: number;
// } & ComponentProps<"div"> &
//   MotionProps;

// export const Stack = React.forwardRef(
//   ({ row, children, ...props }: StackProps, ref) => (
//     <div
//       {...props}
//       ref={ref}
//       className={`flex ${row ? "flex-row" : "flex-col"} ${
//         props.className ? `${props.className}` : ""
//       }`}
//     >
//       {children}
//     </div>
//   ),
// );

// type ElementWithTitleProp = {
//   title: string;
//   gap?: number;
// } & ComponentProps<"div">;

// <ElementWithTitle className="gap-[3.33vw]" title="최근 인기있는 작품들"></ElementWithTitle>

// export const ElementWithTitle = ({
//   title,
//   children,
//   ...props
// }: ElementWithTitleProp) => (
//   <div {...props}>
//     <p className=" text-[6.67vw] font-bold">{title}</p>
//     {children}
//   </div>
// );
