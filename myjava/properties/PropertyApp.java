package myjava.properties;

public class PropertyApp {
    public static void main(String args[]) {
        System.out.println(PropertyUtil.getProperty("key1"));
        System.out.println(Integer.parseInt(PropertyUtil.getProperty("key2")));
        System.out.println(PropertyUtil.getProperty("key4"));
    }
}
