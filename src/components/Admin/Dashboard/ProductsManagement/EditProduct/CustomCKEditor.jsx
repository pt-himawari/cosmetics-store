import React from "react";
import { Box, Grid } from "@mui/material/";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CustomCKEditor = ({
  Controller,
  control,
  name,
  errors,
  productWithId,
}) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          height: "auto",
          borderRadius: "5px",
        }}
      >
        <Controller
          name={name}
          rules={{ required: "* Please enter description" }}
          control={control}
          render={({ field }) => (
            <CKEditor
              editor={ClassicEditor}
              data={productWithId.description}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "300px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                field.onChange(data); // Cập nhật trạng thái form với dữ liệu mới
              }}
              onBlur={field.onBlur} // Xử lý sự kiện onBlur
            />
          )}
        />

        <Box
          sx={{
            color: "#d32f2f",
            fontWeight: 700,
          }}
        >
          {errors.description && <p>{errors.description?.message}</p>}
        </Box>
      </Box>
    </Grid>
  );
};

export default CustomCKEditor;
