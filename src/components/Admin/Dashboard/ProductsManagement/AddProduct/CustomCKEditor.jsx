import React from "react";
import { Box, Grid } from "@mui/material/";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const CustomCKEditor = ({ Controller, control, name, errors }) => {
  return (
    <Grid item xs={12} mt={4}>
      <Box
        sx={{
          borderRadius: "5px",
        }}
      >
        <Controller
          name={name}
          control={control}
          rules={{ required: "* Please enter description" }}
          render={({ field }) => (
            <CKEditor
              editor={ClassicEditor}
              data=""
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
              onFocus={(event, editor) => {}}
            />
          )}
        />

        <Box
          sx={{
            color: "#d32f2f",
            fontWeight: 700,
          }}
        >
          {errors[name] && <p>{errors[name].message}</p>}
        </Box>
      </Box>
    </Grid>
  );
};

export default CustomCKEditor;
