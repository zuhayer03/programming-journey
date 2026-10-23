import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.TreeMap;

/** Analyze a simple CSV of simulated login events with rules-based alerts. */
public class ThreatTrace {
    static final int DEFAULT_THRESHOLD=3;
    static class Report {
        Map<String,Integer> failuresByIp=new TreeMap<>();
        int valid=0,invalid=0;
        int alerts(int threshold) {
            int count=0;
            for(int value:failuresByIp.values())if(value>=threshold)count++;
            return count;
        }
    }
    static Report analyze(Path file) throws IOException {
        Report report=new Report();
        try(BufferedReader reader=Files.newBufferedReader(file)) {
            String header=reader.readLine();
            if(header==null||!header.trim().equals("timestamp,ip,event"))
                throw new IOException("Expected header: timestamp,ip,event");
            String line;
            while((line=reader.readLine())!=null) {
                if(line.isBlank())continue;
                String[] parts=line.split(",",-1);
                if(parts.length!=3||parts[0].isBlank()||parts[1].isBlank()||
                   !(parts[2].trim().equalsIgnoreCase("FAIL")||parts[2].trim().equalsIgnoreCase("SUCCESS"))) {
                    report.invalid++;continue;
                }
                report.valid++;
                if(parts[2].trim().equalsIgnoreCase("FAIL")) {
                    String ip=parts[1].trim();
                    report.failuresByIp.put(ip,report.failuresByIp.getOrDefault(ip,0)+1);
                }
            }
        }
        return report;
    }
    public static void main(String[] args) throws IOException {
        Path path=Path.of(args.length>0?args[0]:"sample_logins.csv");
        int threshold=DEFAULT_THRESHOLD;
        if(args.length>1) {
            try{threshold=Integer.parseInt(args[1]);}
            catch(NumberFormatException e){System.err.println("Threshold must be an integer");return;}
        }
        if(threshold<1){System.err.println("Threshold must be positive");return;}
        Report report=analyze(path);
        System.out.printf("ThreatTrace | valid: %d; invalid: %d%n",report.valid,report.invalid);
        for(Map.Entry<String,Integer> entry:report.failuresByIp.entrySet())
            System.out.printf("%-18s %d failed logins %s%n",entry.getKey(),entry.getValue(),
                              entry.getValue()>=threshold?"[ALERT]":"");
        System.out.printf("Alerted IPs: %d (threshold %d)%n",report.alerts(threshold),threshold);
        System.out.println("Educational rule-based analysis; not real-time attack detection.");
    }
}
