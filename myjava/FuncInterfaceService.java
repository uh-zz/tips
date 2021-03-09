package myjava;

// package tips.java.function.interface;
import java.util.function.Function;
import java.util.function.Predicate;

public class FuncInterfaceService {
    public static void main(String[] args) {
        System.out.println("hoge");

        // 引数 T を与えて、Rを返す
        // Function<T, R>
        Function<String, Integer> function = string -> Integer.parseInt(string);

        System.out.println(function.apply("123"));

        // 引数Tを与えて、booleanの値を返す
        // Predicate<T>
        //
        // predicateは「断定する」という意味
        // 値の検証を明示する時に使われる
        Predicate<String> emptyChecker = string -> string.isEmpty();

        System.out.println(emptyChecker.test(""));

        System.out.println(emptyChecker.test("fuga"));

        HogePoint point = HogePoint.searchByKey(1);
        System.out.println(point.getValue());
    }

    public enum HogePoint {
        POINT_1(1, "one"), POINT_2(2, "two"), POINT_3(3, "three"), ERROR(0, "");

        private Integer key;
        private String value;

        public Integer getKey() {
            return key;
        }

        public String getValue() {
            return value;
        }

        private HogePoint(Integer key, String value) {
            this.key = key;
            this.value = value;
        }

        public static HogePoint searchByKey(Integer key) {
            for (HogePoint hoge : HogePoint.values()) {
                if (hoge.getKey().equals(key)) {
                    return hoge;
                }
            }
            return ERROR;
        }
    }
}