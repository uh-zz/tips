package myjava;

// package tips.java.function.interface;
import java.util.function.Function;

public class FuncInterfaceService {
    public static void main(String[] args) {
        System.out.println("hoge");

        // 引数 T を与えて、Rを返す
        // Function<T, R>
        Function<String, Integer> function = string -> Integer.parseInt(string);

        System.out.println(function.apply("123"));

    }
}