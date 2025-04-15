
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/convert")
public class FileConversionController {

    @PostMapping
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
                                              @RequestParam("format") String format) {
        String convertedFilePath = convertFile(file, format);

        if (convertedFilePath != null) {
            return ResponseEntity.ok().body(new ConversionResult("File converted successfully!", convertedFilePath));
        } else {
            return ResponseEntity.status(500).body(new ConversionResult("Conversion failed!", ""));
        }
    }

    private String convertFile(MultipartFile file, String format) {
        String fileName = file.getOriginalFilename();
        String convertedFilePath = "converted_files/" + fileName;

        File destFile = new File(convertedFilePath);
        try {
            file.transferTo(destFile);
            return convertedFilePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    static class ConversionResult {
        private String message;
        private String filePath;

        public ConversionResult(String message, String filePath) {
            this.message = message;
            this.filePath = filePath;
        }

        public String getMessage() {
            return message;
        }

        public String getFilePath() {
            return filePath;
        }
    }
}
