import java.util.Arrays;
import java.util.Random;

/** Compare three elementary sorting algorithms using the same data. */
public class AlgoArena {
    static void bubbleSort(int[] a) {
        for (int i=0;i<a.length-1;i++) for (int j=0;j<a.length-i-1;j++)
            if (a[j]>a[j+1]) { int t=a[j];a[j]=a[j+1];a[j+1]=t; }
    }
    static void selectionSort(int[] a) {
        for (int i=0;i<a.length-1;i++) {
            int min=i;
            for (int j=i+1;j<a.length;j++) if (a[j]<a[min]) min=j;
            int t=a[i];a[i]=a[min];a[min]=t;
        }
    }
    static void insertionSort(int[] a) {
        for (int i=1;i<a.length;i++) {
            int value=a[i], j=i-1;
            while (j>=0 && a[j]>value) {a[j+1]=a[j];j--;}
            a[j+1]=value;
        }
    }
    static void sort(String name,int[] a) {
        switch(name) {
            case "Bubble":bubbleSort(a);break;
            case "Selection":selectionSort(a);break;
            case "Insertion":insertionSort(a);break;
            default:throw new IllegalArgumentException(name);
        }
    }
    static void verifyAll(int[] input) {
        int[] expected=input.clone();
        Arrays.sort(expected);
        for(String name:new String[]{"Bubble","Selection","Insertion"}) {
            int[] result=input.clone();
            sort(name,result);
            if(!Arrays.equals(expected,result))throw new AssertionError(name+" sort failed");
        }
    }
    static double benchmark(String name,int[] input,int runs) {
        long total=0;
        for(int run=0;run<runs;run++) {
            int[] a=input.clone();
            long start=System.nanoTime();
            sort(name,a);
            total+=System.nanoTime()-start;
        }
        return total/(runs*1_000_000.0);
    }
    public static void main(String[] args) {
        int runs=5;
        if(args.length>0) {
            try{runs=Integer.parseInt(args[0]);}
            catch(NumberFormatException e){System.err.println("Runs must be an integer");return;}
        }
        if(runs<1||runs>1000){System.err.println("Runs must be between 1 and 1000");return;}
        Random random=new Random(42);
        System.out.println("AlgoArena | average sort milliseconds across "+runs+" runs");
        for(int size:new int[]{100,1000,3000}) {
            int[] data=new int[size];
            for(int i=0;i<size;i++)data[i]=random.nextInt(10_000);
            verifyAll(data);
            for(String name:new String[]{"Bubble","Selection","Insertion"})
                System.out.printf("%-10s %5d elements: %.4f ms%n",name,size,benchmark(name,data,runs));
        }
        System.out.println("Correctness checks passed; timings depend on machine/JVM.");
    }
}
