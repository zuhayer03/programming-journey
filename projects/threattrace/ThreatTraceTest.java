import java.nio.file.Files;
import java.nio.file.Path;

public class ThreatTraceTest {
    public static void main(String[] args) throws Exception {
        Path file=Files.createTempFile("threattrace-test-", ".csv");
        try {
            Files.writeString(file,"timestamp,ip,event\nT,192.0.2.1,FAIL\nT,192.0.2.1,FAIL\nT,192.0.2.1,FAIL\nT,192.0.2.2,SUCCESS\ninvalid row\n");
            ThreatTrace.Report report=ThreatTrace.analyze(file);
            if(report.valid!=4||report.invalid!=1||report.alerts(3)!=1||
               report.failuresByIp.get("192.0.2.1")!=3)
                throw new AssertionError("Unexpected report");
            System.out.println("PASS: failed-login counting, malformed rows, alert thresholds");
        } finally {
            Files.deleteIfExists(file);
        }
    }
}
