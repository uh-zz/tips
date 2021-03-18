package myjava.properties;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

public class PropertyUtil {

    private static String INI_FILE_PATH = "myjava/properties/common.properties";

    private static Properties properties;

    private PropertyUtil() {

    }

    static {
        properties = new Properties();
        try {
            properties.load(Files.newBufferedReader(Paths.get(INI_FILE_PATH), StandardCharsets.UTF_8));
        } catch (IOException e) {
            System.out.println(e);
        }
    }

    public static String getProperty(String key) {

        return properties.getProperty(key);
    }

}
