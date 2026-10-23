/** Run with: java AlgoArenaTest */
public class AlgoArenaTest {
    public static void main(String[] args) {
        int[][] inputs={{},{1},{3,2,1},{2,2,1,-3,0},{9,1,5,7,3}};
        for(int[] input:inputs) {
            AlgoArena.verifyAll(input);
            for(String name:new String[]{"Bubble","Selection","Insertion"}) {
                int[] copy=input.clone();
                AlgoArena.sort(name,copy);
                for(int i=1;i<copy.length;i++) if(copy[i]<copy[i-1])
                    throw new AssertionError(name+" not sorted");
            }
        }
        System.out.println("PASS: 5 input sets x 3 sorting algorithms");
    }
}
